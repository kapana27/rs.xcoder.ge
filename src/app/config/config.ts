export  const Config = {
  baseURI: '',
  operations: {
    property: {
      get:{
        data: '/api/secured/Item/Section/In/Select',
        in: '/api/secured/Item/Section/In/Select',
        out: '/api/secured/Item/Section/Out/Select',
        list: '/api/secured/Item/Select',

      }
    }
  },
  itemTypes: {
    get: {
        types:'/api/secured/ItemType/Select'
    }
  },
  itemStatus: {
    get: {
        types:'/api/secured/ItemStatus/Select'
    }
  },
  transfer:{
    post:{
        transfer: '/api/secured/Item/Stock/Transfer',
        section: '/api/secured/Item/Section/Transfer',
        person: '/api/secured/Item/Person/Transfer',

    },
    get:{

    }
  },
  List: {
      get:{
        itemFilterByName: '/api/secured/Item/Filter/ByName',
        MeasureUnit: '/api/secured/MeasureUnit/List',
        barcode: '/api/secured/List/BarCode/Select',
        ItemGroup: '/api/secured/ItemGroup/Select',
        marker: '/api/secured/List/Maker/Filter',
        supplier: '/api/secured/List/Supplier/Filter',
        model: '/api/secured/List/Model/Filter',
        stock:'/api/secured/stock/Select',
        rooms: '/api/secured/Item/Building/Rooms'
      },
      post:{
        lastBarCode: '/api/secured/List/BarCode/Get/LastCode',
        marker:'/api/secured/List/Maker/Insert',
        supplier:'/api/secured/List/Supplier/Insert',
        model:'/api/secured/List/Model/Insert',
        freeCodes: '/api/secured/List/BarCode/Get/FreeCodes',
        property: '/api/secured/Staff/Filter/ByStock',
        staff: '/api/secured/Staff/Filter/ByName/V2',
        stock: '/api/secured/Item/Stock/Change',
        addon: '/api/secured/Item/Addon',
        invoice: '/api/secured/Item/Stock/Change',
        return: '/api/secured/Item/Stock/Return',
        section: '/api/secured/Item/Section/Transfer'
      }
  },
  inventory:{
    post:{
      insert: "/api/secured/Item/Insert",
      update: "/api/secured/Item/Update"
    }
  },
  cart:{
    post:{
      put:"/api/secured/internal/session/put",
      getAll: "/api/secured/internal/session/getAll",
      remove: "/api/secured/internal/session/remove",
      clear: "/api/secured/internal/session/clear",
    }
  },
  massage: {
    get: {
      list: '/api/secured/Item/Inbox/Select',
      selectedList: '/api/secured/Item/Inbox/Detail/Select'
    },
    post: {
      NotApprove: '/api/secured/Item/Inbox/NotApprove',
      Approve: '/api/secured/Item/Inbox/Approve'
    }
  }

};
