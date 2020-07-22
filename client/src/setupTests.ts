import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

Object.defineProperty(document, "querySelector", {
  writable: false,
  value: jest.fn().mockImplementation((_query) => ({
    content: "http://example.org",
  })),
});
