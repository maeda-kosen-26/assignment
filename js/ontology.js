// ontology.js
class LearningOntology {
  constructor() {
    this.concepts = new Map();
    this.relations = new Map();
  }

  // オントロジーデータの読み込み
  async loadOntology(ontologyData) {
    console.log("📚 オントロジーを読み込み中...");

    // 概念の追加
    for (const [conceptId, conceptData] of Object.entries(
      ontologyData.concepts
    )) {
      this.addConcept(conceptId, conceptData);
    }

    // 関係の追加
    for (const relation of ontologyData.relations) {
      this.addRelation(
        relation.from,
        relation.to,
        relation.type,
        relation.strength || 1.0
      );
    }

    console.log(`✅ ${this.concepts.size}個の概念を読み込みました`);
    console.log(`✅ ${this.relations.size}個の関係を読み込みました`);
  }

  // 概念の追加
  addConcept(id, properties) {
    this.concepts.set(id, {
      id: id,
      ...properties,
      addedAt: new Date(),
    });
  }

  // 関係の追加
  addRelation(fromConcept, toConcept, relationType, strength = 1.0) {
    const relationKey = `${fromConcept}-${relationType}-${toConcept}`;
    this.relations.set(relationKey, {
      from: fromConcept,
      to: toConcept,
      type: relationType,
      strength: strength,
    });
  }

  // 概念の取得
  getConcept(conceptId) {
    return this.concepts.get(conceptId);
  }

  // 前提知識チェーン（prerequisite関係をたどる）
  getPrerequisiteChain(conceptId) {
    const chain = [];
    const concept = this.concepts.get(conceptId);

    if (concept && concept.prerequisites) {
      for (const prereq of concept.prerequisites) {
        chain.push(prereq);
        chain.push(...this.getPrerequisiteChain(prereq));
      }
    }

    return [...new Set(chain)];
  }

  // 関連概念の探索（幅優先探索）
  findRelatedConcepts(conceptId, maxDepth = 2) {
    const visited = new Set();
    const related = new Set();
    const queue = [{ concept: conceptId, depth: 0 }];

    while (queue.length > 0) {
      const { concept, depth } = queue.shift();
      if (visited.has(concept) || depth > maxDepth) continue;
      visited.add(concept);
      if (depth > 0) related.add(concept);

      for (const [key, relation] of this.relations) {
        if (relation.from === concept && !visited.has(relation.to)) {
          queue.push({ concept: relation.to, depth: depth + 1 });
        }
        if (relation.to === concept && !visited.has(relation.from)) {
          queue.push({ concept: relation.from, depth: depth + 1 });
        }
      }
    }

    return Array.from(related);
  }

  // getRelatedConceptsとしてラッパーを追加
  getRelatedConcepts(conceptId, maxDepth = 2) {
    return this.findRelatedConcepts(conceptId, maxDepth);
  }

  // デバッグ用：オントロジーの状態を表示
  printOntology() {
    console.log("=== オントロジーの状態 ===");
    console.log("概念数:", this.concepts.size);
    console.log("関係数:", this.relations.size);

    console.log("\n概念一覧:");
    for (const [id, concept] of this.concepts) {
      console.log(`- ${id}: ${concept.label} (${concept.level})`);
    }

    console.log("\n関係一覧:");
    for (const [key, relation] of this.relations) {
      console.log(`- ${relation.from} --[${relation.type}]--> ${relation.to}`);
    }
  }
}
