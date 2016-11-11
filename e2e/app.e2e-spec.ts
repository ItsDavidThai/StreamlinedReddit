import { WwCcPage } from './app.po';

describe('ww-cc App', function() {
  let page: WwCcPage;

  beforeEach(() => {
    page = new WwCcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
