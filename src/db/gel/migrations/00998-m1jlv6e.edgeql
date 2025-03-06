CREATE MIGRATION m1jlv6eufubbhabufiulxp7tpqv4smxrk2qiqkhr3uo5mv2gnr43dq
    ONTO m1in4xsjyrpepxe22f7z7j4kry6fxz2vinxw4fakoax52lxaho2spa
{
  ALTER TYPE sys_user::SysTask {
      DROP LINK codeCategory;
  };
};
