import logger from "./logger";

const URL = 'https://coronavirus-19-api.herokuapp.com';

export const covidService = {
  takeSnapshot(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  },
  getGlobalSnapshot() {
    return JSON.parse(
      localStorage.getItem('covid-global') || '{"cases": 0, "deaths": 0, "recovered": 0}'
    );
  },
  getCountriesSnapshot() {
    return JSON.parse(localStorage.getItem('covid-all') || '[]');
  },
  async getGlobal() {
    const name = 'covid-global';
    try {
      const res = await fetch(`${URL}/all`);
      const data = await res.json();
      logger.debug(data);
      logger.info('Covid global loaded');
      this.takeSnapshot(name, data);
      return data;
    } catch (err) {
      logger.error(err.response);
      return this.getGlobalSnapshot();
    }
  },
  async getAll() {
    const name = 'covid-all';
    try {
      const res = await fetch(`${URL}/countries`);
      const data = await res.json();
      logger.debug(data);
      logger.info('Covid all loaded');
      this.takeSnapshot(name, data);
      return data;
    } catch (err) {
      logger.error(err.response);
      return this.getCountriesSnapshot();
    }
  }
};

export default covidService;
