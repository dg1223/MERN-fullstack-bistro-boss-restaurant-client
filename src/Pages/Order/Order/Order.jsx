import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import orderCover from "../../../assets/shop/order.jpg";
import Cover from "../../Shared/Cover/Cover";
import { useState } from "react";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../hooks/useMenu";

const Order = () => {
  // React tabs controlled mode
  const [tabIndex, setTabIndex] = useState(0);
  const [menu] = useMenu();
  return (
    <div>
      <Cover img={orderCover} title="order food"></Cover>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => console.log(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Desset</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
