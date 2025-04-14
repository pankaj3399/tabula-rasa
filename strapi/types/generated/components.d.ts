import type { Schema, Struct } from '@strapi/strapi';

export interface TopicDiagnosis extends Struct.ComponentSchema {
  collectionName: 'components_topic_diagnoses';
  info: {
    description: '';
    displayName: 'Diagnosis';
  };
  attributes: {
    overview: Schema.Attribute.RichText;
    tools: Schema.Attribute.Text;
  };
}

export interface TopicType extends Struct.ComponentSchema {
  collectionName: 'components_topic_types';
  info: {
    description: '';
    displayName: 'Type';
  };
  attributes: {
    abbreviation: Schema.Attribute.String;
    causes: Schema.Attribute.Text;
    description: Schema.Attribute.RichText;
    diagnosticFindings: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    symptoms: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'topic.diagnosis': TopicDiagnosis;
      'topic.type': TopicType;
    }
  }
}
