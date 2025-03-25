# Project website
https://quickimmi.ai/

# JSON Form Cheatsheet

family.spouse: spouse is the child of family object

applicant.childrenCnt-family.children: family.children is an array, applicant.childrenCnt is the count of the array

count-family.sibilings: family.sibilings is an array, count is not in use, just a placeholder

section can be used to repurpose the parent key

```
Below two parts are hidden
    {
      "label": "text_Signature",
      "id": "PartD,PartE",
      "type": "level1",
      "steps": [
        {
          "label": "text_Signature",
          "id": "signature",
          "type": "level2",
          "referenceId": "i589_fields_signature"
        },
        {
          "label": "text_Declaration",
          "id": "declaration",
          "type": "level2",
          "referenceId": "i589_fields_declaration"
        }
      ]
    }
```
