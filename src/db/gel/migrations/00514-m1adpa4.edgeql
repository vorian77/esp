CREATE MIGRATION m1adpa4xscjlrgc5y2cqlc5kcxasxppkzi66jsmgly663xiwh2u3aa
    ONTO m1pqrj3we2kcl3c3xagbyag4sywrai4w4fa25vzjlflay7wnezfqyq
{
              ALTER TYPE sys_rep::SysRepParm {
      DROP LINK codeAlignment;
      DROP LINK codeSortDir;
  };
};
