const bleh = "woah";
console.log(`hello ${bleh}`);

const obj = { hey: 1 };
const obj2 = { ...obj, bleh: 2 };
console.log(obj2);

class AppComponent {
  static PropTypes = {
    blegh: "whoa"
  };
}

switch (bleh) {
  case 1:
    console.log("HEY");
    break;

  case 2:
    console.log("WHOA");
    break;
}
