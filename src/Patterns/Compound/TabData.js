import Tabs from "./Tabs";

export default function TabData() {
  const items = [
    {
      value: "html",
      label: "HTML",
      panel:
        "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
    },
    {
      value: "css",
      label: "CSS",
      panel:
        "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
    },
    {
      value: "javascript",
      label: "JavaScript",
      panel:
        "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
    },
  ];

  return (
    <Tabs>
      {items.map((item) => (
        <Tabs.Tab value={item.value}>{item.label}</Tabs.Tab>
      ))}
      {items.map((item) => (
        <Tabs.panel value={item.value}>{item.panel}</Tabs.panel>
      ))}
    </Tabs>
  );
}
