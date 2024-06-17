CREATE MIGRATION m1poajkcy5ybqxayrmtiasi6v4vlfzaiwrlhgk2mggsfuow2dqpq4q
    ONTO m1sc7w4tyggjaxp3hzgyevnyqskyhigdzltk7r4kzemntcmqlxjhnq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK linkColumns;
  };
};
