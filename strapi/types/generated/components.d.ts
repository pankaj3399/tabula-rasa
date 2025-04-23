import type { Schema, Struct } from '@strapi/strapi';

export interface CommonTextItem extends Struct.ComponentSchema {
  collectionName: 'components_common_text_items';
  info: {
    description: 'Single text item for repeatable lists';
    displayName: 'Text Item';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface TopicDiseaseType extends Struct.ComponentSchema {
  collectionName: 'components_topic_disease_types';
  info: {
    description: 'Container for different disease types (e.g., DCM, HCM, RCM)';
    displayName: 'Disease Type';
  };
  attributes: {
    abbreviation: Schema.Attribute.String;
    anchor_id: Schema.Attribute.String & Schema.Attribute.Required;
    causes: Schema.Attribute.Component<'common.text-item', true>;
    description: Schema.Attribute.RichText;
    diagnosticFindings: Schema.Attribute.Component<'common.text-item', true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    symptoms: Schema.Attribute.Component<'common.text-item', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.text-item': CommonTextItem;
      'topic.disease-type': TopicDiseaseType;
    }
  }
}
