CREATE MIGRATION m1vmbnurtd3zhyo52e5hvnmflodgliexrljryrwbj3phwsynkrkuha
    ONTO m1flxwkx56cyl2vlgjxzrlp6mupwfqxdhjacl3ef4mq2yubdbzrmkq
{
  ALTER TYPE sys_core::SysDataObjStyle {
      DROP LINK codeDataObjStyle;
  };
};
