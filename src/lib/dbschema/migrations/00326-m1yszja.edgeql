CREATE MIGRATION m1yszjar4c4jkvtf5xvst6kvqirs6mq2ca2r2juyumlna4rdrsjs4a
    ONTO m1lnqzlmn5etvjuv6cjsbpma6curk6j7b7awnrgcykwjioqbflwziq
{
  ALTER TYPE sys_rep::SysAnalytic {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
  ALTER TYPE sys_rep::SysRep {
      CREATE CONSTRAINT std::exclusive ON (.name);
  };
};
