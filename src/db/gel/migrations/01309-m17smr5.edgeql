CREATE MIGRATION m17smr5hpbhid7yleltgnw46pqf6r7rlmikjnbiy2u5hlhdfzxhgqq
    ONTO m1gs4vnxgtzmttwxwbefme6ox3hac5w6sruwgxt5srfwse5n6cdwcq
{
  ALTER TYPE sys_core::SysSystem {
      CREATE LINK users := (.<systems[IS sys_user::SysUser]);
  };
};
