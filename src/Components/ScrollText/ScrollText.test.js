import React from "react";
import ScrollText from "./index";
import { shallow } from "enzyme";

describe("ScrollText Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ScrollText />);
  });

  it.skip("should update state when component is mounted", () => {
    expect(wrapper.state().currentQuote).not.toEqual("");
  });
});
