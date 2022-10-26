import React, { useEffect } from "react";
import ExampleComponent1 from "../../modules/example/component/ExampleComponent1/ExampleComponent1";

const HomePage = () => {
  const dataName = false;

  useEffect(() => {}, []);

  return (
    <div>
      <ExampleComponent1 />
    </div>
  );
};

export default HomePage;
