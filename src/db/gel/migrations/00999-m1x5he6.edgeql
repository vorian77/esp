CREATE MIGRATION m1x5he6wxqzv4ehfphevpe6tmzwdxyft4qiywiosx66mxlcjwqhgsq
    ONTO m1jlv6eufubbhabufiulxp7tpqv4smxrk2qiqkhr3uo5mv2gnr43dq
{
  ALTER TYPE sys_user::SysTask {
      CREATE PROPERTY noDataMsg: std::str;
  };
};
