CREATE MIGRATION m1mnu222sp77qls42n2ruagcfty26feldml3lastckiaibmjpm4dtq
    ONTO m1adpa4xscjlrgc5y2cqlc5kcxasxppkzi66jsmgly663xiwh2u3aa
{
  CREATE TYPE sys_db::Test {
      CREATE PROPERTY jsonProp1: std::json;
      CREATE PROPERTY jsonProp2: std::json;
  };
};
