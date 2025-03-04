CREATE MIGRATION m1de5mppph3y4dxtlljegfrw2j74ornueifm7j4gb3sgtomwo7l67a
    ONTO m1cyyrzrcsbhtyjcaqa2a5hs3i7nqtrfzu72oalktyhhs53oikohvq
{
              ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY exprListEdit: std::str;
  };
};
