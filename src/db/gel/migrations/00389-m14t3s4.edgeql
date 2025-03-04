CREATE MIGRATION m14t3s4z2varv6j6wiz2qq6eswefu5vgd3eaf4qog6iphawkwoi6qa
    ONTO m1nq76ra6p56c5fgudsvioht6r22rpnxicufveh4sdaocec77s74dq
{
                  ALTER TYPE sys_rep::SysRep {
      CREATE PROPERTY exprOrder: std::str;
  };
};
