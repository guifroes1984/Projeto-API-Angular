import { ProjetoUiPage } from './app.po';

describe('projeto-ui App', () => {
  let page: ProjetoUiPage;

  beforeEach(() => {
    page = new ProjetoUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
