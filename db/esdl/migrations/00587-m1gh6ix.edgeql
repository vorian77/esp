CREATE MIGRATION m1gh6ixebgxxwlc4pg3lbxqff3jrth6potgu76ognlwh7qi2n6eaja
    ONTO m1qfkcct62msghynpba3zkisjycbl5zff665htatxtcxij4tcme4ka
{
  ALTER TYPE sys_user::SysStaff {
      CREATE LINK owner: sys_core::SysSystem;
  };
};
