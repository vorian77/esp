CREATE MIGRATION m1jglhwczphp7jjmclkjusc2huejnqxkrkwlmjbgdowd7i7ly5or4a
    ONTO m12iliqgowg5p26qrbh5wo24gykfqbhae4a2uezatmc5inuvww22aq
{
  CREATE MODULE sys_api IF NOT EXISTS;
  CREATE TYPE sys_api::SysApi EXTENDING sys_core::SysObjAttr {
      CREATE CONSTRAINT std::exclusive ON (.name);
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_api'));
          SET OWNED;
          SET REQUIRED;
          SET TYPE sys_core::SysCode;
      };
  };
};
