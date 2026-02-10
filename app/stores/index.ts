import { defineStore } from 'pinia';

export interface Item {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  type: string;
  priority?: number;
}

export interface Rule {
  id: number;
  name: string;
  conditions: string[];
  status: string;
  actions: string[];
}

export const useItemStore = defineStore('items', {
  state: () => ({
    items: [
      { id: 1, name: 'Item 1', description: 'Primo elemento', enabled: true, type: 'Type A', priority: 1 },
      { id: 2, name: 'Item 2', description: 'Secondo elemento', enabled: false, type: 'Type B', priority: 2 },
      { id: 3, name: 'Item 3', description: 'Terzo elemento', enabled: true, type: 'Type A', priority: 3 },
      { id: 4, name: 'Item 4', description: 'Quarto elemento', enabled: false, type: 'Type C', priority: 4 },
    ] as Item[],
    rules: [
      { id: 1, name: 'Rule 1', conditions: ['Condition A', 'Condition B'], status: 'Active', actions: ['Action 1'] },
      { id: 2, name: 'Rule 2', conditions: ['Condition C'], status: 'Active', actions: ['Action 1', 'Action 2'] },
      { id: 3, name: 'Rule 3', conditions: ['Condition A'], status: 'Inactive', actions: ['Action 3'] },
    ] as Rule[],
    nextId: 5,
    nextRuleId: 4,
  }),

  actions: {
    addItem(name: string, description: string, enabled: boolean, type: string, priority?: number) {
      this.items.push({
        id: this.nextId++,
        name,
        description,
        enabled,
        type,
        priority,
      });
    },

    removeItem(id: number) {
      const index = this.items.findIndex(p => p.id === id);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },

    updateItem(id: number, name: string, description: string, enabled: boolean, type: string, priority?: number) {
      const item = this.items.find(p => p.id === id);
      if (item) {
        item.name = name;
        item.description = description;
        item.enabled = enabled;
        item.type = type;
        item.priority = priority;
      }
    },

    addRule(name: string, conditions: string[], status: string, actions: string[]) {
      this.rules.push({
        id: this.nextRuleId++,
        name,
        conditions,
        status,
        actions,
      });
    },

    removeRule(id: number) {
      const index = this.rules.findIndex(r => r.id === id);
      if (index !== -1) {
        this.rules.splice(index, 1);
      }
    },

    updateRule(id: number, name: string, conditions: string[], status: string, actions: string[]) {
      const rule = this.rules.find(r => r.id === id);
      if (rule) {
        rule.name = name;
        rule.conditions = conditions;
        rule.status = status;
        rule.actions = actions;
      }
    },
  },
});

