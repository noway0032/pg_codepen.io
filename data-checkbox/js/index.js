var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var App = function (_React$Component) {_inherits(App, _React$Component);
  function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));
    _this.getMeta = _this.getMeta.bind(_this);
    _this.toggleItem = _this.toggleItem.bind(_this);
    _this.addItem = _this.addItem.bind(_this);
    _this.editItem = _this.editItem.bind(_this);
    _this.deleteItem = _this.deleteItem.bind(_this);
    _this.setItemHeight = _this.setItemHeight.bind(_this);
    _this.getItemCountText = _this.getItemCountText.bind(_this);
    _this.state = {
      item: {
        height: 10 },

      items: [
      { id: 1, name: 'Alma', isCompleted: false, height: 0 },
      { id: 2, name: 'Körte', isCompleted: false, height: 0 },
      { id: 3, name: 'Banán', isCompleted: false, height: 0 },
      { id: 4, name: 'Narancs', isCompleted: false, height: 0 },
      { id: 5, name: 'Mandarin', isCompleted: false, height: 0 },
      { id: 6, name: 'Barack', isCompleted: false, height: 0 }] };return _this;


  }_createClass(App, [{ key: 'componentDidMount', value: function componentDidMount()
    {
      //*  setTimeout(() => this.toggleItem(2), 700)
    } }, { key: 'getMeta', value: function getMeta()
    {
      var items = this.state.items,
      completed = items.filter(function (item) {return item.isCompleted;}),
      uncompleted = items.filter(function (item) {return !item.isCompleted;});

      return {
        completed: {
          items: completed,
          height: completed.length > 0 ? _.sumBy(completed, 'height') : 0 },

        uncompleted: {
          items: uncompleted,
          height: uncompleted.length > 0 ? _.sumBy(uncompleted, 'height') : 0 } };


    } }, { key: 'toggleItem', value: function toggleItem(
    id) {
      var updatedItems = this.state.items.
      map(function (item) {return _extends({}, item, { isCompleted: item.id === id ? !item.isCompleted : item.isCompleted });});
      this.setState({ items: updatedItems });
    } }, { key: 'addItem', value: function addItem(
    name) {
      var updatedItems = [].concat(_toConsumableArray(this.state.items));
      updatedItems.push({ id: 0, name: name, isCompleted: false });
      updatedItems = updatedItems.map(function (item, index) {
        var newItem = _extends({}, item, { id: index + 1 });
        return newItem;
      });
      this.setState({ items: updatedItems });
    } }, { key: 'editItem', value: function editItem(
    id, name) {
      var updatedItems = this.state.items.
      map(function (item) {return _extends({}, item, { name: item.id === id ? name : item.name });});
      this.setState({ items: updatedItems });
    } }, { key: 'deleteItem', value: function deleteItem(
    id) {
      var updatedItems = [].concat(_toConsumableArray(this.state.items)).filter(function (item) {return item.id !== id;});
      this.setState({ items: updatedItems });
    } }, { key: 'setItemHeight', value: function setItemHeight(
    id, height) {
      var updatedItems = this.state.items.
      map(function (item) {
        if (item.id === id) {
          item.height = height;
        }
        return item;
      });
      this.setState({ items: updatedItems });
    } }, { key: 'getItemCountText', value: function getItemCountText()
    {
      var meta = this.getMeta();
      var itemCountText = '';
      if (meta.completed.items.length === 0) {
        itemCountText = 'Nincs kiválasztott elem';
      } else
      if (meta.completed.items.length >= 1) {
        var pluralText = meta.completed.items.length === 1 ? 'teljesített' : 'teljesített';
        itemCountText = meta.completed.items.length + ' ' + pluralText + ' elem';
      }
      return itemCountText;
    } }, { key: 'render', value: function render()
    {var _this2 = this;
      var meta = this.getMeta();
      var uInd = 0,cInd = 0;
      var items = this.state.items.
      map(function (item, index) {return (
          React.createElement(Item, {
            key: item.id,
            id: item.id,
            index: item.isCompleted ? cInd++ : uInd++,
            height: item.height,
            name: item.name,
            meta: meta,
            isCompleted: item.isCompleted,
            toggleItem: function toggleItem() {return _this2.toggleItem(item.id);},
            editItem: _this2.editItem,
            deleteItem: function deleteItem() {return _this2.deleteItem(item.id);},
            setItemHeight: _this2.setItemHeight }));});


      var itemCountText = this.getItemCountText();
      return (
        React.createElement('div', { id: 'app' },
          React.createElement('div', { id: 'items-outer-container' },
            React.createElement('div', { id: 'items-container', className: 'scroll-bar' },
              React.createElement(AddItemInput, { addItem: this.addItem }),
              React.createElement('div', { id: 'items' },
                React.createElement('div', { id: 'items-uncompleted__spacer', style: { height: meta.uncompleted.height + 'px' } }),
                items,
                React.createElement('div', { id: 'items-completed__header' }, React.createElement('h1', null, itemCountText)),
                React.createElement('div', { id: 'items-completed__spacer', style: { height: meta.completed.height + 'px' } })))),



          React.createElement('div', { id: 'app__background-accent' })));


    } }]);return App;}(React.Component);var

AddItemInput = function (_React$Component2) {_inherits(AddItemInput, _React$Component2);
  function AddItemInput(props) {_classCallCheck(this, AddItemInput);var _this3 = _possibleConstructorReturn(this, (AddItemInput.__proto__ || Object.getPrototypeOf(AddItemInput)).call(this,
    props));
    _this3.handleKeyDown = _this3.handleKeyDown.bind(_this3);return _this3;
  }_createClass(AddItemInput, [{ key: 'handleKeyDown', value: function handleKeyDown(
    e) {var
      value = e.target.value;
      if (value && e.key === 'Enter') {
        this.props.addItem(value);
        this.refs.addItemInput.value = '';
      }
    } }, { key: 'render', value: function render()
    {var
      handleKeyDown = this.props.handleKeyDown;
      return (
        React.createElement('div', { id: 'add-item-input' },
          React.createElement('i', { className: 'fas fa-plus' }),
          React.createElement('input', {
            ref: 'addItemInput',
            type: 'text',
            placeholder: '\xDAj listaelem hozz\xE1ad\xE1sa',
            onKeyDown: this.handleKeyDown })));



    } }]);return AddItemInput;}(React.Component);var

Item = function (_React$Component3) {_inherits(Item, _React$Component3);
  function Item(props) {_classCallCheck(this, Item);var _this4 = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this,
    props));
    _this4.getTop = _this4.getTop.bind(_this4);
    _this4.toggleEdit = _this4.toggleEdit.bind(_this4);
    _this4.state = {
      isEditing: false };return _this4;

  }_createClass(Item, [{ key: 'componentDidMount', value: function componentDidMount()
    {
      var height = this.refs.item.getBoundingClientRect().height;
      this.props.setItemHeight(this.props.id, height);
    } }, { key: 'componentDidUpdate', value: function componentDidUpdate()
    {
      var height = this.refs.item.getBoundingClientRect().height;
      if (height !== this.props.height) {
        console.log(height, this.props.height);
        this.props.setItemHeight(this.props.id, height);
      }
    } }, { key: 'getTop', value: function getTop()
    {var _props =
      this.props,meta = _props.meta,id = _props.id,index = _props.index,height = _props.height,isCompleted = _props.isCompleted;
      var prevHeight = isCompleted ?
      _.sumBy(meta.completed.items.slice(0, index), 'height') :
      _.sumBy(meta.uncompleted.items.slice(0, index), 'height'),
      top = isCompleted ?
      meta.uncompleted.height + prevHeight + 60 :
      prevHeight;
      return top;
    } }, { key: 'toggleEdit', value: function toggleEdit()
    {
      this.setState({ isEditing: !this.state.isEditing });
    } }, { key: 'render', value: function render()
    {var _props2 =
      this.props,name = _props2.name,id = _props2.id,height = _props2.height,index = _props2.index,isCompleted = _props2.isCompleted,toggleItem = _props2.toggleItem,deleteItem = _props2.deleteItem,editItem = _props2.editItem;var
      isEditing = this.state.isEditing;
      var classes = isCompleted ? "item completed" : "item",
      top = this.getTop();
      classes = isEditing ? classes + ' editing' : classes;
      var itemName = isEditing ?
      React.createElement(ItemNameInput, { id: id, name: name, height: height, editItem: editItem, toggleEdit: this.toggleEdit }) :

      React.createElement('div', { className: 'item-name', onDoubleClick: !isCompleted ? this.toggleEdit : null },
        React.createElement('h1', null, name));


      return (
        React.createElement('div', { id: 'item-' + id, 'data-height': height, 'data-top': top, ref: 'item', className: classes, style: { top: top + 'px' } },
          React.createElement('div', { className: 'item-icon', onClick: toggleItem },
            React.createElement('i', { className: 'far fa-circle uncompleted' }),
            React.createElement('i', { className: 'fas fa-check completed' })),

          itemName,
          React.createElement('div', { className: 'item-edit', onClick: this.toggleEdit },
            React.createElement('i', { className: 'fas fa-pen' })),

          React.createElement('div', { className: 'item-delete', onClick: deleteItem },
            React.createElement('i', { className: 'fas fa-times-circle' }))));



    } }]);return Item;}(React.Component);var

ItemNameInput = function (_React$Component4) {_inherits(ItemNameInput, _React$Component4);
  function ItemNameInput(props) {_classCallCheck(this, ItemNameInput);var _this5 = _possibleConstructorReturn(this, (ItemNameInput.__proto__ || Object.getPrototypeOf(ItemNameInput)).call(this,
    props));
    _this5.handleKeyDown = _this5.handleKeyDown.bind(_this5);
    _this5.toggleEdit = _this5.toggleEdit.bind(_this5);return _this5;
  }_createClass(ItemNameInput, [{ key: 'componentDidMount', value: function componentDidMount()
    {
      this.refs.itemNameTextArea.focus();
    } }, { key: 'handleKeyDown', value: function handleKeyDown(
    e) {var
      value = e.target.value;
      if (value && e.key === 'Enter') {
        this.props.toggleEdit();
        this.props.editItem(this.props.id, value);
      }
    } }, { key: 'toggleEdit', value: function toggleEdit(
    e) {var
      value = e.target.value;
      this.props.toggleEdit();
      this.props.editItem(this.props.id, value);
    } }, { key: 'render', value: function render()
    {var _props3 =
      this.props,name = _props3.name,height = _props3.height;
      return (
        React.createElement('div', { className: 'item-name-input', style: { height: height - 40 + 'px' } },
          React.createElement('textarea', { ref: 'itemNameTextArea', defaultValue: name, style: { height: height - 40 + 'px' }, onKeyDown: this.handleKeyDown, onBlur: this.toggleEdit })));


    } }]);return ItemNameInput;}(React.Component);


ReactDOM.render(React.createElement(App, null), document.getElementById('checkbox'));