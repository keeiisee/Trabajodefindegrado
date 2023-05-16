from django.conf.urls.static import static
from django.urls import path, include
from django.conf import settings
from django.contrib import admin
urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('accounts/', include('accounts.urls'))
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]