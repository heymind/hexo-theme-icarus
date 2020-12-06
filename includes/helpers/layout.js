/**
 * Helper functions for controlling layout.
 *
 * @example
 *     <%- get_widgets(position) %>
 *     <%- has_column() %>
 *     <%- column_count() %>
 */
module.exports = function (hexo) {
    hexo.extend.helper.register('has_widget', function (type) {
        const hasWidgets = hexo.extend.helper.get('has_config').bind(this)('widgets');
        if (!hasWidgets) {
            return false;
        }
        const widgets = hexo.extend.helper.get('get_config').bind(this)('widgets');
        return widgets.some(widget => widget.hasOwnProperty('type') && widget.type === type);
    });

    hexo.extend.helper.register('get_widgets', function (position) {
        const hasWidgets = hexo.extend.helper.get('has_config').bind(this)('widgets');
        if (!hasWidgets) {
            return [];
        }
        const isHome = hexo.extend.helper.get('is_home').bind(this)();
        const isPage = hexo.extend.helper.get('is_page').bind(this)();
        const isPost = hexo.extend.helper.get('is_post').bind(this)();
        const layout = this.page.layout || (isHome ? 'home' : null) || (isPage ? 'page' : null) || (isPost ? 'post' : null);

        const widgets = hexo.extend.helper.get('get_config').bind(this)('widgets');
        console.log(isHome, isPage, isPost, this.page.layout, layout);
        return widgets.filter(widget => widget.hasOwnProperty('position') && widget.position === position &&
            (widget.hasOwnProperty('layout') ? widget.layout.includes(layout) : true)
        );
    });

    hexo.extend.helper.register('has_column', function (position) {
        const getWidgets = hexo.extend.helper.get('get_widgets').bind(this);
        return getWidgets(position).length > 0;
    });

    hexo.extend.helper.register('column_count', function () {
        let columns = 1;
        const hasColumn = hexo.extend.helper.get('has_column').bind(this);
        columns += hasColumn('left') ? 1 : 0;
        columns += hasColumn('right') ? 1 : 0;
        return columns;
    });
}