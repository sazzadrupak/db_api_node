/* eslint-env jest */
const chai = require('chai');
const supertest = require('supertest');

const { expect } = chai;
let server;

describe('Check /analyze POST api', () => {
  beforeEach(() => { server = supertest.agent(`http://127.0.0.1:8000`); });

  const exec = (data) => server
    .post('/analyze')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Cache-Control', 'no-cache')
    .send(data);

  it('send invalid type payload: failed', async () => {
    const payload = ['text'];
    const res = await exec(payload);
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.all.keys('message');
    expect(res.body.message).to.equal('"value" must be an object');
  });

  it('send empty object payload: failed', async () => {
    const payload = {};
    const res = await exec(payload);
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.all.keys('message');
    expect(res.body.message).to.equal('"text" is required');
  });

  it('send payload with invalid key: failed', async () => {
    const payload = { invalid: '' };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.all.keys('message');
    expect(res.body.message).to.equal('"text" is required');
  });

  it('send payload with extra key: failed', async () => {
    const payload = { text: 'test', extra: 'test' };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.all.keys('message');
    expect(res.body.message).to.equal('"extra" is not allowed');
  });

  it('send array value in text key: failed', async () => {
    const payload = { text: ['test'] };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.all.keys('message');
    expect(res.body.message).to.equal('"text" must be a string');
  });

  it('send object value in text key: failed', async () => {
    const payload = { text: { test: 'test' } };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.all.keys('message');
    expect(res.body.message).to.equal('"text" must be a string');
  });

  it('send number value in text key: failed', async () => {
    const payload = { text: 20 };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.all.keys('message');
    expect(res.body.message).to.equal('"text" must be a string');
  });

  it('send dream broker given value in text key: succeded', async () => {
    const payload = { text: "hello 2 times  " };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('object');

    const expectedResponse = {
      textLength: {
        withSpaces: 15,
        withoutSpaces: 11,
      },
      wordCount: 3,
      characterCount: [
        { e: 2 }, { h: 1 },
        { i: 1 }, { l: 2 },
        { m: 1 }, { o: 1 },
        { s: 1 }, { t: 1 },
      ],
    };
    expect(res.body).to.deep.equal(expectedResponse);
  });

  it('send empty value in text key: succeded', async () => {
    const payload = { text: "" };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('object');

    const expectedResponse = {
      textLength: {
        withSpaces: 0,
        withoutSpaces: 0,
      },
      wordCount: 0,
      characterCount: [],
    };
    expect(res.body).to.deep.equal(expectedResponse);
  });

  it('send number value as string in text key: succeded', async () => {
    const payload = { text: '20' };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('object');
    const expectedResponse = {
      textLength: {
        withSpaces: 2,
        withoutSpaces: 2,
      },
      wordCount: 1,
      characterCount: [],
    };
    expect(res.body).to.deep.equal(expectedResponse);
  });

  it('send upper and lower alphabet as value in text key: succeded', async () => {
    const payload = { text: 'HelLo 2 TiMeS  ' };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('object');
    const expectedResponse = {
      textLength: {
        withSpaces: 15,
        withoutSpaces: 11,
      },
      wordCount: 3,
      characterCount: [
        { e: 2 }, { h: 1 },
        { i: 1 }, { l: 2 },
        { m: 1 }, { o: 1 },
        { s: 1 }, { t: 1 },
      ],
    };
    expect(res.body).to.deep.equal(expectedResponse);
  });

  it('send space as value in text key: succeded', async () => {
    const payload = { text: '  ' };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('object');
    const expectedResponse = {
      textLength: {
        withSpaces: 2,
        withoutSpaces: 0,
      },
      wordCount: 0,
      characterCount: [],
    };
    expect(res.body).to.deep.equal(expectedResponse);
  });

  it('send long string as value in text key: succeded', async () => {
    const payload = { text: `Idrajuv su biege uz ped suoruwuj ma ezadifavo obpe ikopi poko ujpuw kida ho. Bi nipi fivim cagjo as am ofuzot luska on awhag negeta ze vuz je izuje wovude zupigew. Vudu bimseko poedi ojjohu mu le naew uftios nel ikmahec lijharuc lu jot parzonej kitma kuki acizoc sucusba. Nukwifu zaodewe et toflilbug hirun guv innezhic cigo zonoan col nuw vibsod jab caehu nub mos. Dev poba ep ra duloj ekaunapu ma eful oloazla tabwas emuteer puuhu barnic bi ife rinlesgup von. Taasatif atovo lehedel gatoka da re ba uk cevtomo sic folilo eje fidufbis nav.` };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('object');
    const expectedResponse = {
      textLength: {
        withSpaces: 540,
        withoutSpaces: 445,
      },
      wordCount: 96,
      characterCount: [
        { a: 42 }, { b: 15 }, { c: 13 }, { d: 14 }, { e: 40 },
        { f: 12 }, { g: 10 }, { h: 10 }, { i: 37 }, { j: 14 },
        { k: 13 }, { l: 17 }, { m: 11 }, { n: 19 }, { o: 40 },
        { p: 14 }, { r: 10 }, { s: 15 }, { t: 14 }, { u: 43 },
        { v: 13 }, { w: 10 }, { z: 13 },
      ],
    };
    expect(res.body).to.deep.equal(expectedResponse);
  });

  it('send random string as value in text key: succeded', async () => {
    const payload = { text: `a dog is running crazily on the ground who doesn't care about the world` };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('object');
    const expectedResponse = {
      textLength: {
        withSpaces: 71,
        withoutSpaces: 58,
      },
      wordCount: 14,
      characterCount: [
        { a: 4 }, { b: 1 }, { c: 2 },
        { d: 4 }, { e: 4 }, { g: 3 },
        { h: 3 }, { i: 3 }, { l: 2 },
        { n: 6 }, { o: 7 }, { r: 5 },
        { s: 2 }, { t: 4 }, { u: 3 },
        { w: 2 }, { y: 1 }, { z: 1 },
      ],
    };
    expect(res.body).to.deep.equal(expectedResponse);
  });

  it('send special characters as value in text key: succeded', async () => {
    const payload = { text: `#%&/)+ ` };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('object');
    const expectedResponse = {
      textLength: {
        withSpaces: 7,
        withoutSpaces: 6,
      },
      wordCount: 1,
      characterCount: [],
    };
    expect(res.body).to.deep.equal(expectedResponse);
  });

  it('send string special characters as value in text key: succeded', async () => {
    const payload = { text: `#%& special characters *+? ` };
    const res = await exec(payload);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('object');
    const expectedResponse = {
      textLength: {
        withSpaces: 27,
        withoutSpaces: 23,
      },
      wordCount: 4,
      characterCount:
      [
        { a: 3 }, { c: 3 }, { e: 2 }, { h: 1 }, { i: 1 },
        { l: 1 }, { p: 1 }, { r: 2 }, { s: 2 }, { t: 1 },
      ],
    };
    expect(res.body).to.deep.equal(expectedResponse);
  });
});
