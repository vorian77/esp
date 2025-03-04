CREATE MIGRATION m12df53v34fsjig7bbxafynkilarvhcid75tdrg2hpgp4vnaj3yp5a
    ONTO m1orooponlt7zpgml4htgmzjpa5rz6ofini2mfemu3zxeg5xtskk3q
{
          ALTER TYPE sys_user::SysUser {
      CREATE LINK defaultSystem: sys_core::SysSystem;
  };
};
