CREATE MIGRATION m1flxwkx56cyl2vlgjxzrlp6mupwfqxdhjacl3ef4mq2yubdbzrmkq
    ONTO m1zz3nbxz5wyfmstwvummnkldts6fhujbotfsb3xbpecxcpxz4ocyq
{
  ALTER TYPE sys_core::SysDataObjStyle {
      CREATE LINK codeDataObjStyle: sys_core::SysCode;
  };
};
