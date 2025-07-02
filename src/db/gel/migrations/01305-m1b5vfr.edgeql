CREATE MIGRATION m1b5vfrxgcbwypvvfch2piv2tugtqylxtu7es4kcc2hp5rfi55gega
    ONTO m1snvfzib5zp7v5npc2e5i5x7y52y5b4kfwpz6yqol5i4y3yjl4wuq
{
  ALTER TYPE sys_core::SysOrg {
      CREATE LINK users := (.<owner[IS sys_user::SysUser]);
  };
};
