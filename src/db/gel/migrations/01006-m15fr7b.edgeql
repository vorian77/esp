CREATE MIGRATION m15fr7bhvvzpmn5ebnb5j6khiox5scbqtbtfmblh3zj6aqcnkzfdoa
    ONTO m1jf2wq2co7wbmbh4k2insv5giwnoywulmg3bjd4spn4cna4sudsza
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER PROPERTY isDynamicChildrenSystemEntities {
          SET REQUIRED USING (<std::bool>false);
      };
  };
};
