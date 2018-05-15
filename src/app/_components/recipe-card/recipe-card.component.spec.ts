import { RecipeCardComponent } from './recipe-card.component';

const recipe = {
  key: '$key',
  category: 'entree',
  defaultThumbnailUrl: 'https://storage.googleapis.com/ketohub-gcs1/ruled-me_keto-tuna-casserole-680w.jpg',
  ingredients: ['butter', 'carrots'],
  mainImage: 'https://cdn.ruled.me/wp-content/uploads/2017/11/tuna-casserole-featured.jpg',
  publishedTime: '2017-12-21T12:00:54+00:00',
  thumbnailUrls: 'https://storage.googleapis.com/ketohub-gcs1/ruled-me_keto-tuna-casserole-680w.jpg 680w',
  title: 'Keto Tuna Casserole',
  url: 'https://www.ruled.me/keto-tuna-casserole/',
};

// Not necessary to create the template to test this component

describe('RecipeCardComponent', () => {

  let component: RecipeCardComponent;

  beforeEach(() => {
    component = new RecipeCardComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // use the naming convention from The Art of Unit Testing by Roy Overshoe
  // see also: http://osherove.com/blog/2005/4/3/naming-standards-for-unit-tests.html
  // [UnitOfWork_StateUnderTest_ExpectedBehavior]
  it('matchingIngredients_no ingredients_returns empty array', () => {
    const result = component.matchingIngredients(null);
    expect(result).toEqual([]);
  });

  it('matchingIngredients_no searchKeywords_returns empty array', () => {
    component.searchKeywords = undefined;
    const result = component.matchingIngredients([]);
    expect(result).toEqual([]);
  });

  it('matchingIngredients_ingredients contains no keywords_returns empty array', () => {
    component.searchKeywords = ['banana'];
    const result = component.matchingIngredients(['bacon']);
    expect(result).toEqual([]);
  });

  it('matchingIngredients_ingredients contains one keyword_returns match', () => {
    component.searchKeywords = ['bacon'];
    const result = component.matchingIngredients(['bacon', 'avocado']);
    expect(result).toEqual(['bacon']);
  });

  it('getCardClass_searchKeywords undefined_returns empty string', () => {
    component.searchKeywords = undefined;
    const result = component.getCardClass();
    expect(result).toEqual('');
  });

  it('getCardClass_searchKeywords empty_returns empty string', () => {
    component.searchKeywords = [];
    const result = component.getCardClass();
    expect(result).toEqual('');
  });

  it('getCardClass_searchKeywords present_returns tall-card', () => {
    component.searchKeywords = ['bacon'];
    const result = component.getCardClass();
    expect(result).toEqual('tall-card');
  });

  it('getDefaultThumbnailUrl_recipt present__returns correct url', () => {
    const GCS_BUCKET: string = 'ketohub-gcs1';
    component.recipe = recipe;
    const expectedResult = `https://storage.googleapis.com/${GCS_BUCKET}/${recipe.key}-680w.jpg`
    const result = component.getDefaultThumbnailUrl();
    expect(result).toEqual(expectedResult);
  });

  it('getThumbnailUrls_recipt present__returns correct urls', () => {
    const GCS_BUCKET: string = 'ketohub-gcs1';
    component.recipe = recipe;
    const expectedThumbUrl680 = `https://storage.googleapis.com/${GCS_BUCKET}/${recipe.key}-680w.jpg 680w`;
    const expectedThumbUrl560 = `https://storage.googleapis.com/${GCS_BUCKET}/${recipe.key}-560w.jpg 560w`;
    const expectedThumbUrl340 = `https://storage.googleapis.com/${GCS_BUCKET}/${recipe.key}-340w.jpg 340w`;
    const result = component.getThumbnailUrls();
    expect(result.split(',')[0].trim()).toEqual(expectedThumbUrl680);
    expect(result.split(',')[1].trim()).toEqual(expectedThumbUrl560);
    expect(result.split(',')[2].trim()).toEqual(expectedThumbUrl340);
  });
});
