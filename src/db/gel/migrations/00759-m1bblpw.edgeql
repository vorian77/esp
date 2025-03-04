CREATE MIGRATION m1bblpwp5ay6h4t6wwoswr5254tv4c34vawghxarmndipfapzx7ega
    ONTO m1ahpj4zwtvggvvrb2bs2hihzpkba77v3vfrkurcesnortwj6b4fbq
{
          ALTER TYPE sys_user::SysUser {
      DROP LINK owner;
  };
};
