import { CodeTestPage } from './app.po';

describe('code-test App', () => {
  let page: CodeTestPage;

  beforeEach(() => {
    page = new CodeTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
