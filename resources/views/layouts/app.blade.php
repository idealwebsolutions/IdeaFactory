<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet" type="text/css">
    <link href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css" rel="stylesheet">
    <!-- Styles -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <b-navbar variant="faded" type="light">
            <b-navbar-brand tag="h6" class="mb-0" href="{{ url('/') }}">
              {{ config('app.name', 'Laravel') }}
            </b-navbar-brand>
            <b-navbar-toggle target="collapsable-nav"></b-navbar-toggle>
            
            <b-collapse id="nav-collapse" is-nav>
                <!-- Left Side Of Navbar -->
                <b-navbar-nav></b-navbar-nav>
                <!-- Right Side Of Navbar -->
                <b-navbar-nav class="ml-auto">
                    <!-- Authentication Links -->
                    @guest
                    <b-nav-item href="{{ route('login') }}">{{ __('Login') }}</b-nav-item>
                    @else
                    <b-nav-item href="{{ route('home') }}">Home</b-nav-item>
                    <b-nav-item href="{{ route('discover') }}">Explore</b-nav-item>
                    <b-nav-item-dropdown right>
                      <template slot="button-content">
                        <b-img src="{{ Auth::user()->avatar }}" width=25 height=25 alt="avatar"></b-img>
                      </template>
                      <b-dropdown-text>Signed in as <strong class="font-weight-bold">{{ Auth::user()->display_name }}</strong></b-dropdown-text>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item href="{{ route('profile', ['profile' => 'idealwebsolutions']) }}">Profile</b-dropdown-item>
                      <b-dropdown-item href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        {{ __('Logout') }}
                      </b-dropdown-item>
                      <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                      </form>
                    </b-nav-item>
                    @endguest
                  </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
</body>
</html>
