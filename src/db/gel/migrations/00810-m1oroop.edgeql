CREATE MIGRATION m1orooponlt7zpgml4htgmzjpa5rz6ofini2mfemu3zxeg5xtskk3q
    ONTO m12wayldiukq4pl2goiody3oa5dafsbsi3z5zqb7l4c2fqijdipsbq
{
          ALTER TYPE sys_core::SysNodeObj {
      DROP PROPERTY isSystemRoot;
  };
};
