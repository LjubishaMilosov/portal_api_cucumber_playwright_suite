const gameCategorySchema = {
  type: 'object',
  properties: {
    GameCategoryID: { type: 'number' },
    GameCategoryName: { type: 'string', minLength: 1 },
    IconField: { type: 'string' },
  },
  required: ['GameCategoryID', 'GameCategoryName'],
};

const gameSchema = {
  type: 'object',
  properties: {
    GameID: { type: 'number' },
    GameCode: { type: 'string', minLength: 1 },
    GameName: { type: 'string', minLength: 1 },
    GameProviderID: { type: 'number' },
    GameRtp: { type: 'number', minimum: 0 },
    LaunchDate: { type: 'string' },
    ProviderCode: { type: 'string' },
    IsJackpot: { type: 'boolean' },
    IsRealMoneyOnly: { type: 'boolean' },
    GameLogoURL: { type: ['string', 'null'] },
    IsFavorite: { type: 'boolean' },
    Rating: { type: 'number', minimum: 0 },
    IsPopularGame: { type: 'boolean' },
    GameCategories: {
      type: 'array',
      items: gameCategorySchema,
    },
  },
  required: ['GameID', 'GameCode', 'GameName', 'GameProviderID', 'IsJackpot', 'IsRealMoneyOnly'],
};

export const gameDetailsSchema = {
  type: 'object',
  properties: {
    Game: gameSchema,
    RequestID: { type: 'string' },
  },
  required: ['Game'],
};
