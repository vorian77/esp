CREATE MIGRATION m1kl7xou66mcvnnslwtsd2kaj7mn25jz2tzscmgfrpvuija7brr6mq
    ONTO m1jglhwczphp7jjmclkjusc2huejnqxkrkwlmjbgdowd7i7ly5or4a
{
  ALTER TYPE sys_api::SysApi {
      ALTER LINK codeAttrType {
          SET default := (sys_core::getCodeAttrType('at_app_api'));
      };
  };
};
