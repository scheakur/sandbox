sample {
	foo = "foo-default"
	bar = "bar-default"
	baz = "baz-default"
}

// environments$B$O4D6-$4$H$K@_Dj$r@Z$jJ,$1$k$?$a$NFCJL$J5-=R(B
// new ConfigSlurper("dev") $B$N$h$&$K;XDj$5$l$k$H(B environments.dev $B$NCM$G>e=q$-$5$l$k(B
environments {
	dev {
		sample {
			foo = "foo-dev"
		}
	}
	prd {
		sample {
			bar = "bar-prd"
		}
	}
}
