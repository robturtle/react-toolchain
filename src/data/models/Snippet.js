import connection from './connection';
import Sequelize from 'sequelize';

const Snippet = connection.define('snippet', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    unique: 'authorScopeName',
    allowNull: false,
  },

  scope: {
    type: Sequelize.STRING,
    unique: 'authorScopeName',
    allowNull: false,
  },

  type: {
    type: Sequelize.ENUM,
    values: [
      'WHOLE_LINE',
      'IN_LINE',
    ],
    defaultValue: 'WHOLE_LINE',
  },

  author: {
    type: Sequelize.STRING,
    unique: 'authorScopeName',
    allowNull: false,
  },

  keyword: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  substitution: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  indexes: [
    {
      fields: [
        'author',
        'scope',
        'name',
      ],
    },
  ],

  getterMethods: {
    qualifiedName() {
      return `${this.author}/${this.scope}/${this.name}`;
    },

    contents() {
      return {
        scope: this.scope,
        name: this.name,
        type: this.type,
        keyword: this.keyword,
        substitution: this.substitution,
      }
    },

    upstream() {
      return Snippet.findById(this.upstreamId);
    },
  },
});

export default Snippet;
