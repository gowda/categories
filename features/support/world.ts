import { setWorldConstructor, setDefaultTimeout } from 'cucumber';
import { WebDriver } from 'selenium-webdriver';

interface CustomWorldInterface {
  driver: WebDriver | null;
}

function CustomWorld(this: CustomWorldInterface) {
  this.driver = null;

  setDefaultTimeout(20000);
}

setWorldConstructor(CustomWorld);
