CREATE MIGRATION m1t7n7xtqgvj63jiebppqhhslicr7sbkd55k7fasm6lhkpd6xtmnzq
    ONTO m1mnu222sp77qls42n2ruagcfty26feldml3lastckiaibmjpm4dtq
{
              CREATE TYPE default::Test {
      CREATE PROPERTY jsonProp1: std::json;
      CREATE PROPERTY jsonProp2: std::json;
  };
};
