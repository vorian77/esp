CREATE MIGRATION m1xclca6jqjntgr3vjfxc4ilycazl7z4bxdvhq2e6bz6n3vqm4gfxa
    ONTO m12df53v34fsjig7bbxafynkilarvhcid75tdrg2hpgp4vnaj3yp5a
{
          ALTER TYPE sys_user::SysUser {
      ALTER LINK defaultSystem {
          SET REQUIRED USING (<sys_core::SysSystem>{});
      };
  };
};
