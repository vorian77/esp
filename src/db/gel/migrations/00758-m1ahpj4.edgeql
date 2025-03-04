CREATE MIGRATION m1ahpj4zwtvggvvrb2bs2hihzpkba77v3vfrkurcesnortwj6b4fbq
    ONTO m1xiqnirymtpsshf3l36kxwqj64iaxybwmy3nnmvtgk2kyponhmhya
{
          ALTER TYPE sys_user::SysUser {
      ALTER LINK defaultOrg {
          SET REQUIRED USING (<sys_core::SysOrg>{});
      };
  };
};
