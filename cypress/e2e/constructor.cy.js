
describe('Тестирование работы конструктора бургеров', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { statusCode: 200, fixture: 'ingredients' }).as('getIngredients');
  
      //переходим на страницу конструктора
      cy.visit('/');
      //ждем пока прогрузятся с фейк апи
      cy.wait('@getIngredients');

      //делаем алиасы по атрибуту data-ingredient (это в UI находится)
      cy.get('[data-ingredient]').as('ingredient');
    }
    );
    
    it('Ингредиенты прогружаются', () => {
      //проверяем, что ингредиенты появились на странице по названию
      cy.contains('Биокотлета из марсианской Магнолии');
      cy.contains('Краторная булка N-200i');
      cy.contains('Соус с шипами Антарианского плоскоходца');
    });


    it('Ингредиент доступен для добавления в конструктор', () => {
      //проверяем, что в конструкторе есть хотя бы один ингредиент
      cy.get('@ingredient')
      .its('length')
      .should('be.gte', 1);
    });

    it('Добавление ингредиента в конструктор работает корректно', () => {
      cy.get('@ingredient').first().as('firstIngredient');
    
      //получаем название этого ингредиента
      cy.get('@firstIngredient')
        .invoke('text')
        .then((ingredientName) => {
          
          //кликаем по нему
          cy.get('@firstIngredient').find('button').click()
    
          //проверяем, что в области конструктора появился элемент с этим названием
          cy.get('[data-constructor]') 
            .should('contain.text', 'Краторная булка N-200i');
        });
    });


describe('Проверка работы модальных окон', () => {
  it('Открывает модальное окно с информацией об ингредиенте', () => {
    cy.get('@ingredient')
    .first()
    .invoke('text')
    .then((name) => {
      // Кликаем по нему
      cy.get('@ingredient').first().click();

      // Проверяем, что открылось модальное окно
      cy.get('#modals > *').should('have.length', 2);

      // Проверяем, что в модалке есть название этого ингредиента
      cy.get('#modals')
      .find('[data-test="ingredient-title"]')
      .should('contain.text', 'Краторная булка N-200i');
  });

  it('Закрыват модальное окно по клику по крестику', () => {
    cy.get('@ingredient').first().click();
    //проверяем, что модалка открылась
    cy.get('#modals > *').should('have.length', 2);
    //закрываем
    cy.get('[data-close]').click();
    cy.wait(1000)
    cy.get('#modals > *').should('have.length', 0);
  });
})
}
);


describe('Тестирование cоздания заказа', () => {
  beforeEach(() => {
    //мокаем токены
    cy.setCookie('accessToken', 'mocked_access_token');
    localStorage.setItem('refreshToken', 'mocked_refresh_token');

    //получаем наши мокированные данные с запросов. 
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.intercept('POST', 'api/orders', { fixture: 'order' }).as('createOrder');

    //переходим на страницу конструктора
    cy.visit('/');
  }
  );

  it('Создаем и отправляем заказ, открытие модалки c номером, закрытие', () => {

    cy.get('[data-ingredient]').first().find('button').click();
    cy.contains('[data-ingredient]', 'Биокотлета из марсианской Магнолии').find('button').click();
    //кликаем по кнопке оформления заказа (добавила дата-ордер в ui конструктора)
    cy.get('[data-order-button]').click();

    cy.wait('@createOrder').then((interception) => {
      const requestIngredients = interception.request.body.ingredients;
      //проверяем, что массив не пустой
      expect(requestIngredients).to.be.an('array').and.not.empty;
      cy.log(interception.response.body)
      const mockedOrderNumber = interception.response.body.order.number;

      cy.get('#modals > *').should('have.length', 2)
      .and('contain.text', mockedOrderNumber);
  })

  //закрываем окно
    cy.get('[data-close]').click();
    cy.wait(1000)
    cy.get('#modals > *').should('have.length', 0);
    //проверяем, что конструктор очистился
    cy.get('[data-constructor]')
    .find('[data-ingredient]')
    .should('not.exist');
  
  });

  afterEach(() => {
    //очистка после всех тестов
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});
}
)
