import Game from '../Game';

let game;
beforeEach(function(){
    const domNode = document.createElement('div');
    game = new Game(domNode);
});


test('Game is Class', () => {
    expect(typeof Game).toBe('function');
});

test('Game object can\'t create without domNode', () => {
    let game;
    try {
        game = new Game();
    } catch (e) {

    } finally {
        expect(game).toBe(undefined);
    }

    const domNode = document.createElement('div');
    const game2 = new Game(domNode);
    expect(game2).toBeInstanceOf(Game);
});


test('Game object can\'t create without domNode', () => {
    let game;
    try {
        game = new Game();
    } catch (e) {

    } finally {
        expect(game).toBe(undefined);
    }

    const domNode = document.createElement('div');
    const game2 = new Game(domNode);
    expect(game2 instanceof Game).toBe(true);
});


test('Game object should have method start', () => {
    expect(typeof game.start).toBe('function');
});
test('Game object should have method stop', () => {
    expect(typeof game.stop).toBe('function');
});
test('Game object should have method reset', () => {
    expect(typeof game.reset).toBe('function');
});
test('Game object should have method getPlayer', () => {
    expect(typeof game.getPlayer).toBe('function');
});
test('Game object should have method addPlayer', () => {
    expect(typeof game.getPlayer).toBe('function');
});
test('Game object should have method deletePlayer', () => {
    expect(typeof game.getPlayer).toBe('function');
});
