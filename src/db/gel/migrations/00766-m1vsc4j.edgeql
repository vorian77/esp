CREATE MIGRATION m1vsc4jpbybnytwnjpjnilj2qkkd5zt2qyqj27q7lzcfsh2qqn2ekq
    ONTO m1ujf4nk2f6svvjikkvazor33npuezvsw4rdfdrjyh2ps6enkypytq
{
          ALTER TYPE sys_user::SysUser {
      ALTER PROPERTY password {
          RESET OPTIONALITY;
      };
  };
};
