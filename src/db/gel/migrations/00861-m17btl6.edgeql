CREATE MIGRATION m17btl62iyeamscnworlitxb3n5l46l4ytgpwulkh3a6gfd76wsobq
    ONTO m16brk5xepasc6yr72tjjaf5cbefhtacdzlz5jwa2fdllq2h26hzwq
{
  ALTER TYPE sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};
