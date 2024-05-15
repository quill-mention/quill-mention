import Quill from "quill";
import "quill-mention/autoregister";

// import {MentionBlot, Mention} from "quill-mention";
// Quill.register({ "blots/mention": MentionBlot, "modules/mention": Mention });

import 'quill-mention/dist/quill.mention.css';
import './styles.css';

// Initialisation de Quill
document.addEventListener('DOMContentLoaded', () => {
  const atValues = [
    { id: "515fd775-cb54-41f3-b921-56163871e2cf", value: "Mickey Dooley" },
    { id: "3f0b7933-57b8-4d9d-b238-f8af62b2e945", value: "Desmond Waterstone" },
    { id: "711f68ab-ca20-4011-ab0f-d98c8fac4c05", value: "Jeralee Fryd" },
    { id: "775e05fc-72bc-48a1-9508-5c61674734f1", value: "Eddie Hucquart" },
    { id: "e8701885-105e-4a21-b200-98e559776655", value: "Nathalia Whear" },
  ];

  const hashValues = [
    { id: "0075256a-19c2-4a2d-b549-627000bcc3bc", value: "Accounting" },
    { id: "91e8901b-e3bf-4158-8ddf-7f5d9e8cbb7f", value: "Product Management" },
    { id: "c3373e89-7ab8-4a45-8b69-0b0cc49d89a9", value: "Marketing" },
    { id: "fa22f1d2-16c8-4bea-b869-8acad16e187a", value: "Engineering" },
    { id: "fe681168-f315-42f0-b78b-b1ea787fa1fd", value: "Accounting" },
  ];

  const advancedValues = [
    { id: "1", value: "Manuel Neuer", team: "Bayern Munich", color: "green" },
    { id: "2", value: "Robert Lewandowski", team: "Bayern Munich", color: "blue" },
    { id: "3", value: "Thomas Muller", team: "Bayern Munich", color: "red" },
    { id: "4", value: "Roman Burki", team: "Borussia Dortmund", color: "orange" },
    { id: "5", value: "Jadon Sancho", team: "Borussia Dortmund", color: "black" },
    { id: "6", value: "Marco Reus", team: "Borussia Dortmund", color: "yellow" },
    { id: "7", value: "Alexander Nubel", team: "Schalke 04", color: "purple" },
    { id: "8", value: "Bastian Oczipka", team: "Schalke 04", color: "indigo" },
    { id: "9", value: "Weston McKennie", team: "Schalke 04", color: "violet" },
  ];

  var quill = new Quill("#editor", {
    placeholder: "Start by typing @ for mentions or # for hashtags...",
    modules: {
      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@", "#"],
        source: function (searchTerm, renderList, mentionChar) {
          let values;

          if (mentionChar === "@") {
            values = atValues;
          } else {
            values = hashValues;
          }

          if (searchTerm.length === 0) {
            renderList(values, searchTerm);
          } else {
            const matches = [];
            for (let i = 0; i < values.length; i++) {
              if (values[i].value.toLowerCase().includes(searchTerm.toLowerCase())) {
                matches.push(values[i]);
              }
            }
            renderList(matches, searchTerm);
          }
        },
      },
    },
  });

  const MentionBlot = Quill.import("blots/mention");
  class StyledMentionBlot extends MentionBlot {
    static render(data) {
      const element = document.createElement("span");
      element.innerText = data.value;
      element.style.color = data.color;
      return element;
    }
  }
  StyledMentionBlot.blotName = "styled-mention";

  Quill.register(StyledMentionBlot);

  var quill2 = new Quill("#editor2", {
    placeholder: "Start by typing @ for mentions",
    modules: {
      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@"],
        positioningStrategy: "fixed",
        renderItem: (data) => {
          if (data.disabled) {
            const div = document.createElement("div");
            div.style = "height:10px;line-height:10px;font-size:10px;background-color:#ccc;margin:0 -20px;padding:4px";
            div.innerText = data.value;
            return div;
          }
          return data.value;
        },
        renderLoading: () => {
          return "Loading...";
        },
        source: function (searchTerm, renderList, mentionChar) {
          var matches = [];

          if (searchTerm.length === 0) {
            matches = advancedValues;
          } else {
            for (let i = 0; i < advancedValues.length; i++) {
              if (advancedValues[i].value.toLowerCase().includes(searchTerm.toLowerCase())) {
                matches.push(advancedValues[i]);
              }
            }
          }

          // create group header items
          var matchesWithGroupHeaders = [];
          var currentTeam;
          for (let i = 0; i < matches.length; i++) {
            var match = matches[i];
            if (currentTeam !== match.team) {
              matchesWithGroupHeaders.push({ id: match.team, value: match.team, disabled: true });
              currentTeam = match.team;
            }
            matchesWithGroupHeaders.push(match);
          }
          matches = matchesWithGroupHeaders;

          window.setTimeout(() => {
            renderList(matches, searchTerm);
          }, 1000);
        },
        dataAttributes: ["id", "value", "denotationChar", "link", "target", "disabled", "color"],
        blotName: "styled-mention",
      },
    },
  });

  window.showMenu = function () {
    quill2.getModule("mention").openMenu("@");
  };

  window.addMention = function () {
    quill2.getModule("mention").insertItem({ denotationChar: "@", id: "123abc", value: "Hello World" }, true);
  };

  window.addEventListener("mention-clicked", function (event) {
    console.log(event);
  });
});
